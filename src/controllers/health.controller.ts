import {
  HealthCheckRequest,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
  HealthController,
  HealthControllerMethods,
} from '../protos/health';
import { Observable } from 'rxjs';

@HealthControllerMethods()
export class HealthControllerImpl implements HealthController {
  constructor() {}
  check(_data: HealthCheckRequest): HealthCheckResponse {
    return { status: HealthCheckResponse_ServingStatus.SERVING };
  }
  watch(_request: HealthCheckRequest): Observable<HealthCheckResponse> {
    return new Observable<HealthCheckResponse>((subscriber) => {
      subscriber.next({ status: HealthCheckResponse_ServingStatus.SERVING });
      subscriber.complete();
    });
  }
}
