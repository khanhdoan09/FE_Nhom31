import { TestBed } from '@angular/core/testing';

import { OldContentChatService } from './old-content-chat.service';

describe('OldContentChatService', () => {
  let service: OldContentChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldContentChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
