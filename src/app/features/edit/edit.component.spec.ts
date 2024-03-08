import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { EditComponent } from './edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditComponent', () => {
    let component: EditComponent;
    let fixture: ComponentFixture<EditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                EditComponent
            ],
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the id field disabled', () => {
        const fixture = TestBed.createComponent(EditComponent);
        const host = fixture.nativeElement;
        fixture.detectChanges();

        const idField = host.querySelector('#id');

        expect(idField.disabled).toBeTrue();
    });
});
