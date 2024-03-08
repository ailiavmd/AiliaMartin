import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CreateComponent } from './create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateComponent', () => {
    let component: CreateComponent;
    let fixture: ComponentFixture<CreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                CreateComponent
            ],
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(CreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('submit button should be disabled on invalid form', () => {
        const fixture = TestBed.createComponent(CreateComponent);
        const host = fixture.nativeElement;
        fixture.detectChanges();

        const submit = host.querySelector('[type="submit"]');

        expect(submit.classList.contains('disabled')).toBeTrue();
    });

    it('submit method should not advance submit validation on invalid form submission', () => {
        const fixture = TestBed.createComponent(CreateComponent);
        const host = fixture.nativeElement;
        fixture.detectChanges();

        const submit = host.querySelector('[type="submit"]');
        submit.classList.remove('disabled');
        submit.click();

        expect(fixture.componentInstance.loading).toBeFalse();
    });

    it('submit method should advance pass submit validation on valid form submission', () => {
        const fixture = TestBed.createComponent(CreateComponent);
        const host = fixture.nativeElement;
        
        fixture.detectChanges();

        fixture.componentInstance.form.patchValue({
            id: 'aaaaa',
            name: 'nameee',
            description: 'description',
            logo: 'logo',
            date_release: new Date(),
            date_revision: new Date()
        });

        fixture.detectChanges();

        const submit = host.querySelector('[type="submit"]');
        submit.click();

        expect(fixture.componentInstance.loading).toBeTrue();
    });
});
