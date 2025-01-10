import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendService } from './mock-backend.service';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendService, multi: true },
  ],
})
export class MocksModule {}
