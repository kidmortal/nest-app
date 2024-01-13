// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        v4.25.0
// source: solver.proto

package solver

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Message struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Nonce int32 `protobuf:"varint,1,opt,name=nonce,proto3" json:"nonce,omitempty"`
}

func (x *Message) Reset() {
	*x = Message{}
	if protoimpl.UnsafeEnabled {
		mi := &file_solver_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Message) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Message) ProtoMessage() {}

func (x *Message) ProtoReflect() protoreflect.Message {
	mi := &file_solver_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Message.ProtoReflect.Descriptor instead.
func (*Message) Descriptor() ([]byte, []int) {
	return file_solver_proto_rawDescGZIP(), []int{0}
}

func (x *Message) GetNonce() int32 {
	if x != nil {
		return x.Nonce
	}
	return 0
}

type Response struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Solution int32 `protobuf:"varint,1,opt,name=solution,proto3" json:"solution,omitempty"`
}

func (x *Response) Reset() {
	*x = Response{}
	if protoimpl.UnsafeEnabled {
		mi := &file_solver_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Response) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Response) ProtoMessage() {}

func (x *Response) ProtoReflect() protoreflect.Message {
	mi := &file_solver_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Response.ProtoReflect.Descriptor instead.
func (*Response) Descriptor() ([]byte, []int) {
	return file_solver_proto_rawDescGZIP(), []int{1}
}

func (x *Response) GetSolution() int32 {
	if x != nil {
		return x.Solution
	}
	return 0
}

var File_solver_proto protoreflect.FileDescriptor

var file_solver_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x73, 0x6f, 0x6c, 0x76, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x73, 0x6f, 0x6c, 0x76, 0x65, 0x72, 0x22, 0x1f, 0x0a, 0x07, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x12, 0x14, 0x0a, 0x05, 0x6e, 0x6f, 0x6e, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05,
	0x52, 0x05, 0x6e, 0x6f, 0x6e, 0x63, 0x65, 0x22, 0x26, 0x0a, 0x08, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x73, 0x6f, 0x6c, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x08, 0x73, 0x6f, 0x6c, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x32,
	0x42, 0x0a, 0x0d, 0x53, 0x6f, 0x6c, 0x76, 0x65, 0x72, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x31, 0x0a, 0x0a, 0x53, 0x6f, 0x6c, 0x76, 0x65, 0x4e, 0x6f, 0x6e, 0x63, 0x65, 0x12, 0x0f,
	0x2e, 0x73, 0x6f, 0x6c, 0x76, 0x65, 0x72, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x1a,
	0x10, 0x2e, 0x73, 0x6f, 0x6c, 0x76, 0x65, 0x72, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x00, 0x42, 0x1f, 0x5a, 0x1d, 0x6b, 0x69, 0x64, 0x6d, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6e, 0x65, 0x73, 0x74, 0x2d, 0x61, 0x70, 0x70, 0x2f, 0x73, 0x6f,
	0x6c, 0x76, 0x65, 0x72, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_solver_proto_rawDescOnce sync.Once
	file_solver_proto_rawDescData = file_solver_proto_rawDesc
)

func file_solver_proto_rawDescGZIP() []byte {
	file_solver_proto_rawDescOnce.Do(func() {
		file_solver_proto_rawDescData = protoimpl.X.CompressGZIP(file_solver_proto_rawDescData)
	})
	return file_solver_proto_rawDescData
}

var file_solver_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_solver_proto_goTypes = []interface{}{
	(*Message)(nil),  // 0: solver.Message
	(*Response)(nil), // 1: solver.Response
}
var file_solver_proto_depIdxs = []int32{
	0, // 0: solver.SolverService.SolveNonce:input_type -> solver.Message
	1, // 1: solver.SolverService.SolveNonce:output_type -> solver.Response
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_solver_proto_init() }
func file_solver_proto_init() {
	if File_solver_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_solver_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Message); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_solver_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Response); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_solver_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_solver_proto_goTypes,
		DependencyIndexes: file_solver_proto_depIdxs,
		MessageInfos:      file_solver_proto_msgTypes,
	}.Build()
	File_solver_proto = out.File
	file_solver_proto_rawDesc = nil
	file_solver_proto_goTypes = nil
	file_solver_proto_depIdxs = nil
}
