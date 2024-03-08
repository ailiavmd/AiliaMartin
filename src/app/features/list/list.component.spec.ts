import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show loading component when records have not been fetched', () => {
        const fixture = TestBed.createComponent(ListComponent);
        const host = fixture.nativeElement;
        fixture.detectChanges();

        const loading = host.querySelector('.loading-view');

        expect(loading).toBeTruthy();
    });

    it('should render row with empty message when the record list is empty', () => {
        const fixture = TestBed.createComponent(ListComponent);
        fixture.componentInstance.products = [];
        fixture.detectChanges();

        const host = fixture.nativeElement;
        const cell = host.querySelector('table td');
        const content = cell.innerText;

        expect(content).toBe('No hay registros');
    });

    it('should render rows when there are records', () => {
        const fixture = TestBed.createComponent(ListComponent);

        fixture.componentInstance.products = [{
            id: '',
            name: '',
            logo: '',
            description: '',
            date_release: new Date(),
            date_revision: new Date()
        }];

        fixture.detectChanges();

        const host = fixture.nativeElement;
        const rows = host.querySelectorAll('table tbody tr');

        expect(rows.length).toBe(1);
    });

    it('should filter rows based on the query field', () => {
        const fixture = TestBed.createComponent(ListComponent);

        fixture.componentInstance.products = [
            {
                id: '',
                name: '001',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '002',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            }
        ];

        fixture.detectChanges();

        fixture.componentInstance.query = '001';

        fixture.detectChanges();

        const host = fixture.nativeElement;
        const rows = host.querySelectorAll('table tbody tr');

        expect(rows.length).toBe(1);
    });

    it('should disable previous page when you are on the first page', () => {
        const fixture = TestBed.createComponent(ListComponent);

        fixture.componentInstance.products = [
            {
                id: '',
                name: '001',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            }
        ];

        fixture.detectChanges();

        const host = fixture.nativeElement;
        const prev = host.querySelector('button[title="left"]');

        expect(prev.disabled).toBeTrue();
    });

    it('should render second page when there are enough records', () => {
        const fixture = TestBed.createComponent(ListComponent);

        fixture.componentInstance.products = [
            {
                id: '',
                name: '001',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '002',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '003',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '004',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '005',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            },
            {
                id: '',
                name: '006',
                logo: '',
                description: '',
                date_release: new Date(),
                date_revision: new Date()
            }
        ];

        fixture.detectChanges();

        const host = fixture.nativeElement;
        const next = host.querySelector('button[title="right"]');
        next.click();

        fixture.detectChanges();

        const row = host.querySelector('table tbody tr');

        expect(row.innerText).toContain('6');
    });
});
