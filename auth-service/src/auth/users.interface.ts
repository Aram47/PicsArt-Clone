import { Observable } from 'rxjs';

export interface UsersServiceClient {
  createUserGrpc(request: CreateUserRequest): Observable<GrpcUser>;
  getUserGrpc(request: GetUserRequest): Observable<GrpcUser>;
  getUserByEmailGrpc(request: GetUserByEmailRequest): Observable<GrpcUser>;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface GetUserRequest {
  id: number;
}

export interface GetUserByEmailRequest {
  email: string;
}

export interface GrpcUser {
  id: number;
  email: string;
  password: string;
  username: string;
}