import { TestBed } from '@angular/core/testing';

import { ChatsSidebarService } from './chats-sidebar.service';

describe('ChatsSidebarService', () => {
  let service: ChatsSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
