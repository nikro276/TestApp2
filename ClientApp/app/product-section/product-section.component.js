var productSection = angular.module('productSection', ['dx']);

productSection.component('productSection', {
    templateUrl: 'product-section/product-section.template.html',
    controller: ['$scope', function($scope) {
        const displayFormat = "dd.MM.yyyy";
        var dateFilter;
        var categoryFilter;

        var dataSource = new DevExpress.data.DataSource({
            store: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",   
                load: function() {
                    return fetch("products/getproducts", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            dateFilter: dateFilter,
                            categoryFilter: categoryFilter
                        })
                    }).catch(() => { throw 'Data loading error' })
                        .then(response => response.json());
                },
                insert: function(values) {
                    return fetch("products/insert", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).catch(() => { throw "Inserting failed" });
                },
                remove: function(key) {
                    return fetch("products/delete", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(key)
                    }).catch(() => { throw "Removing failed" });
                },
                update: function(key, values) {
                    var product = dataSource.items().find(x => x.id === key);
                    product = {...product, ...values};
                    return fetch("products/update", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    }).catch(() => { throw "Updating failed" });
                }.bind(this)
            })
        });

        var categoriesStore = new DevExpress.data.CustomStore({
            key: "id",
            loadMode: "raw",   
            load: function() {
                return fetch("categories/getcategories")
                    .catch(() => { throw 'Data loading error' })
                    .then(response => response.json());
            }
        });

        var sourcesStore = new DevExpress.data.CustomStore({
            key: "id",
            loadMode: "raw",   
            load: function() {
                return fetch("sources/getsources")
                    .catch(() => { throw 'Data loading error' })
                    .then(response => response.json());
            }
        });

        $scope.lookupOptions = {
            value: categoryFilter,
            dataSource: categoriesStore,
            valueExpr: "id",
            displayExpr: "name",
            showClearButton: true,
            dropDownOptions: {
                showTitle: false,
            },
            onValueChanged: function(data) {
                categoryFilter = data.value;
            }
        };

        $scope.dateBoxOptions = {
            value: dateFilter,
            showClearButton: true,
            displayFormat: displayFormat,
            onValueChanged: function(data) {
                dateFilter = data.value;
            }
        }

        $scope.dataGridOptions = {
            dataSource: dataSource,
            showBorders: true,
            editing: {
                allowUpdating: true,
                allowAdding: false,
                allowDeleting: true,
                confirmDelete: true,
                mode: "row"
            },
            columns: [
                {
                    dataField: "id",
                    caption: "Id",
                    allowEditing: false
                },
                {
                    dataField: "name",
                    caption: "Наименование"
                },
                {
                    dataField: "categoryId",
                    caption: "Производитель",
                    lookup: {
                        dataSource: categoriesStore,
                        valueExpr: "id",
                        displayExpr: "name",
                        allowClearing: true
                    }
                },
                {
                    dataField: "sourceId",
                    caption: "Производитель",
                    lookup: {
                        dataSource: sourcesStore,
                        valueExpr: "id",
                        displayExpr: "name",
                        allowClearing: true
                    }
                },
                {
                    dataField: "modifiedOn",
                    caption: "Дата изменения",
                    dataType: "date",
                    format: displayFormat,
                    editorOptions: {
                        showClearButton: true
                    }
                },
                {
                    dataField: "comment",
                    caption: "Комментарий"
                }
            ]
        }

        $scope.onButtonClick = function() {
            dataSource.reload();
        }
    }]
})