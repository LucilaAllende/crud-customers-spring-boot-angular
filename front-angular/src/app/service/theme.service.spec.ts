import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockMatchMedia: jasmine.Spy;
  let fakeStorage: Record<string, string>;

  beforeEach(() => {
    mockMatchMedia = spyOn(window, 'matchMedia').and.returnValue({
      matches: false, // Valor default
      addListener: jasmine.createSpy(),
      removeListener: jasmine.createSpy(),
      addEventListener: jasmine.createSpy(),
      removeEventListener: jasmine.createSpy()
    } as unknown as MediaQueryList);

    fakeStorage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return fakeStorage[key] ?? null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      fakeStorage[key] = value;
    });
    
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
    (localStorage.getItem as jasmine.Spy).calls.reset();
    (localStorage.setItem as jasmine.Spy).calls.reset();
  });

  describe('Theme Initialization', () => {
    it('should apply dark theme if stored in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('dark');
      service = TestBed.inject(ThemeService);
      
      expect(document.documentElement.classList).toContain('dark');
    });

    it('should apply light theme if stored in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('light');
      service = TestBed.inject(ThemeService);
      
      expect(document.documentElement.classList).not.toContain('dark');
    });

    it('should follow system preference in auto mode (dark)', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('auto');
      mockMatchMedia.and.returnValue({ matches: true } as MediaQueryList);
      
      service = TestBed.inject(ThemeService);
      
      expect(document.documentElement.classList).toContain('dark');
    });

    it('should follow system preference in auto mode (light)', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('auto');
      mockMatchMedia.and.returnValue({ matches: false } as MediaQueryList);
      
      service = TestBed.inject(ThemeService);
      
      expect(document.documentElement.classList).not.toContain('dark');
    });
  });

  describe('Theme Change', () => {
    beforeEach(() => {
      service = TestBed.inject(ThemeService);
    });

    it('should save to localStorage and apply changes', fakeAsync(() => {
      service.setTheme('dark');
      tick(); // Process async update
    
      expect(localStorage.setItem).toHaveBeenCalledWith('hs_theme', 'dark');
      expect(document.documentElement.classList).toContain('dark');
    }));

    it('should update observable immediately when changing theme', fakeAsync(() => {
      let currentTheme: string;
      service.getThemeObservable().subscribe(theme => currentTheme = theme);

      service.setTheme('dark');
      tick(); // Process async updates
      
      expect(currentTheme!).toBe('dark');
    }));
  });

  describe('Utility Functions', () => {
    it('should get current theme from localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue('dark');;
      service = TestBed.inject(ThemeService);
      
      expect(service.getCurrentTheme()).toBe('dark');
    });

    it('should return "auto" when no theme is stored', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      service = TestBed.inject(ThemeService);
      
      expect(service.getCurrentTheme()).toBe('auto');
    });
  });
});