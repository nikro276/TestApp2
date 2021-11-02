var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
let ProductSectionComponent = class ProductSectionComponent {
    constructor() {
        this.productsStore = {};
        this.categoriesStore = {};
        this.sourcesStore = {};
        this.initCategoriesStore();
        this.initProductsStore();
        this.initSourcesStore();
    }
    initCategoriesStore() {
        this.categoriesStore = new CustomStore({
            key: "id",
            loadMode: "raw",
            load: () => {
                return fetch("categories/getcategories")
                    .catch(() => { throw 'Data loading error'; })
                    .then(response => response.json());
            }
        });
    }
    initSourcesStore() {
        this.sourcesStore = new CustomStore({
            key: "id",
            loadMode: "raw",
            load: () => {
                return fetch("sources/getsources")
                    .catch(() => { throw 'Data loading error'; })
                    .then(response => response.json());
            }
        });
    }
    initProductsStore() {
        this.productsStore = new DataSource({
            store: new CustomStore({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return fetch("products/getproducts", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            dateFilter: this.dateFilter,
                            categoryFilter: this.categoryFilter
                        })
                    }).catch(() => { throw 'Data loading error'; })
                        .then(response => response.json());
                },
                insert: values => {
                    return fetch("products/insert", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).then(() => { })
                        .catch(() => { throw "Insert failed"; });
                },
                remove: key => {
                    return fetch("products/delete", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(key)
                    }).then(() => { })
                        .catch(() => { throw "Remove failed"; });
                },
                update: function (key, values) {
                    var product = this.productsStore.items().find(x => x.id === key);
                    product = Object.assign(Object.assign({}, product), values);
                    return fetch("products/update", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    }).then(() => { })
                        .catch(() => { throw "Update failed"; });
                }.bind(this)
            })
        });
    }
    onButtonClick() {
        var a = this.dateFilter;
        this.productsStore.reload();
    }
};
ProductSectionComponent = __decorate([
    Component({
        selector: 'product-section',
        templateUrl: './product-section.component.html'
    })
], ProductSectionComponent);
export { ProductSectionComponent };
//# sourceMappingURL=product-section.component.js.map