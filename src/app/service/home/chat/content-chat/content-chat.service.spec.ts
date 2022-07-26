import { TestBed } from '@angular/core/testing';

import { ContentChatService } from './content-chat.service';

describe('ContentChatService', () => {
  let service: ContentChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
