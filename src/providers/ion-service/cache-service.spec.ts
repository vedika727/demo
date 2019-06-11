import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CacheServiceProvider } from './cache-service';
import { IonicModule, Platform } from 'ionic-angular/index';
import { StorageMock } from '../../../test-config/mocks-ionic';
import { Storage } from '@ionic/storage';
import { SecureStorageProvider } from '../secure-storage/secure-storage';

describe('CacheServiceProvider', () => {

    let service: CacheServiceProvider;
    let storage: SecureStorageProvider;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CacheServiceProvider],
            imports: [
                IonicModule.forRoot(CacheServiceProvider),

            ],
            providers: [

                {
                    provide: SecureStorageProvider,

                    useFactory: () => StorageMock.instance()
                }

            ]

        });
    }));

    beforeEach(() => {

        storage = StorageMock.instance();
        service = new CacheServiceProvider(storage);
        spyOn(service, "getCache").and.callThrough();
        spyOn(service, "setCache").and.callThrough();
        spyOn(service, "removeCache").and.callThrough();
        spyOn(service, "clearCache").and.callThrough();

    });


    //To check the page is created or not
    it('should create provider', () => expect(service).toBeDefined());

    it('should call function getCache()', ()  => {
        service.getCache(name);
        expect(storage.get).toBeDefined(true);
        expect(service.getCache).toBeDefined;
    });

    it('should call function setCache()', ()  => {
        service.setCache(name, 123);
        expect(service.setCache).toBeDefined(true);
        expect(storage.set).toBeDefined;
    });

    it('should call function removeCache()', ()  => {
        service.removeCache(name);
        expect(service.removeCache).toBeDefined(true);
        expect(storage.remove).toBeDefined;
    });

    it('should call function clearCache()', ()  => {
        service.clearCache();
        expect(service.clearCache).toBeDefined(true);
        expect(storage.clear).toBeDefined;
    });
});
