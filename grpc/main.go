package main

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"flag"
	"fmt"
	"log"
	"net"
	"runtime"
	"sync"

	"google.golang.org/grpc"
	pb "kidmortal.com/nest-app/chain"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

type server struct {
	pb.SolverServiceServer
}

func mineWorker(workerID int, nonce int32, solutionCh chan<- int, doneCh chan struct{}) {
	solution := workerID + 1
	fmt.Printf("Worker %d: Mining...\n", workerID)

	for {
		select {
		case <-doneCh:
			return // Stop the worker if doneCh is closed
		default:

			attempValue := int32(solution) + nonce
			data := []byte(fmt.Sprintf("%d", attempValue))
			hash := md5.New()
			hash.Write(data)
			attempt := hex.EncodeToString(hash.Sum(nil))

			if attempt[:6] == "000000" {
				fmt.Printf("Worker %d: Solved %d\n", workerID, solution)
				solutionCh <- solution
				close(doneCh) // Close doneCh to signal other workers to stop
				return
			}
			solution += runtime.NumCPU() // Increment by the number of CPU threads
		}
	}
}

func mine(nonce int32) int {
	numCPU := runtime.NumCPU()
	solutionCh := make(chan int, numCPU)
	doneCh := make(chan struct{})

	var wg sync.WaitGroup
	wg.Add(numCPU)

	for i := 0; i < numCPU; i++ {
		go func(workerID int) {
			defer wg.Done()
			mineWorker(workerID, nonce, solutionCh, doneCh)
		}(i)
	}

	wg.Wait()
	close(solutionCh)
	solution := <-solutionCh
	fmt.Printf("Final Solution: %d\n", solution)
	return solution
}

// func mine(nonce int32) int {
// 	solution := 1
// 	fmt.Println("Mining...")

// 	for {
// 		data := []byte(fmt.Sprintf("%d", nonce+int32(solution)))
// 		hash := md5.New()
// 		hash.Write(data)
// 		attempt := hex.EncodeToString(hash.Sum(nil))

// 		if attempt[:4] == "0000" {
// 			fmt.Printf("Solved %d\n", solution)
// 			return solution
// 		}
// 		solution++
// 	}
// }

// SayHello implements helloworld.GreeterServer
func (s *server) SolveNonce(ctx context.Context, input *pb.Message) (*pb.Response, error) {
	fmt.Println("call")
	Solution := mine(input.GetNonce())
	return &pb.Response{Solution: int32(Solution)}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterSolverServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
