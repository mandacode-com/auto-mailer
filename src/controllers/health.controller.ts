import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  HEALTH_SERVICE_NAME,
  HealthCheckRequest,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
} from '../protos/health';

@Controller()
export class HealthController {
  constructor() {}
  @GrpcMethod(HEALTH_SERVICE_NAME, 'Check')
  check(_data: HealthCheckRequest): HealthCheckResponse {
    return { status: HealthCheckResponse_ServingStatus.SERVING };
  }
}
