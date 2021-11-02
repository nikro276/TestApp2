import {Component} from '@angular/core'
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

@Component({
    selector: 'product-section',
    templateUrl: './product-section.component.html'
})
export class ProductSectionComponent {
    displayFormat = "dd.MM.yyyy";
    dateFilter: null;
    categoryFilter: null;
    productsStore: any = {};
    categoriesStore: any = {};
    sourcesStore: any = {};

    constructor() {
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
                    .catch(() => { throw 'Data loading error' })
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
                    .catch(() => { throw 'Data loading error' })
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
                    }).catch(() => { throw 'Data loading error' })
                        .then(response => response.json());
                },
                insert: values => {
                    return fetch("products/insert", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).then(() => {})
                        .catch(() => { throw "Insert failed" });
                },
                remove: key => {
                    return fetch("products/delete", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(key)
                    }).then(() => {})
                        .catch(() => { throw "Remove failed" });
                },
                update: function(key, values) {
                    var product = this.productsStore.items().find(x => x.id === key);
                    product = {...product, ...values};
                    return fetch("products/update", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    }).then(() => {})
                        .catch(() => { throw "Update failed" });
                }.bind(this)
            })
        });
    }

    onButtonClick() {
        this.productsStore.reload();
    }
}