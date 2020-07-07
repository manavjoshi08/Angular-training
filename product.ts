class Product {
    constructor(
        public ProductId: number,
        public ProductName: string,
        public Category: string, 
        public Manufacturer: string,
        public Description: string,
        public Price: number) {
    }
}

class ProductLogic {
    Products: Array<Product>;

    getAll(): Array<Product> {
        return this.Products;
    }

    listByCategory(category : string): Array<Product> {
        return this.getAll().filter(x => x.Category === category)
    }

    listByManufacturer(manufacturer : string): Array<Product> {
        return this.getAll().filter(x => x.Manufacturer === manufacturer)
    }

    create(ProductId: number,
        ProductName: string,
        Category: string,
        Manufacturer: string, 
        Description: string, 
        Price: number): void {

        let product = new Product(ProductId, ProductName, Category, Manufacturer, Description, Price);
        if (this.validate(product)){
            this.save(product);
        }
    }

    update(ProductId: number, ProductName: string, Category: string,
        Manufacturer: string, Description: string, Price: number): void {

        let productToBeUpdated = this.Products.find(x => x.ProductId === ProductId);

        if (this.validate(productToBeUpdated)) {
            let updatedIndex = this.Products.indexOf(productToBeUpdated);

            this.Products[updatedIndex].ProductName = ProductName;
            this.Products[updatedIndex].Category = Category;
            this.Products[updatedIndex].Manufacturer = Manufacturer;
            this.Products[updatedIndex].Description = Description;
            this.Products[updatedIndex].Price = Price;
        }
    }

    delete(ProductId: number): void {
        this.Products = this.Products.filter(x => x.ProductId !== ProductId);
    }

    save(product: Product): void {
        this.Products.push(product);
    }

    validate(product: Product): boolean {
        //Check if product is not undefined
        if (product == undefined) {
            return false;
        }
        let existingProduct = this.Products.filter(x => x.ProductId == product.ProductId)

        //Check if productId exists
        if((existingProduct == undefined || existingProduct == null) && product.ProductId === product.ProductId){
            return false;
        }

        //Check if productName is not invalid
        if (!/^[a-zA-Z]+$/.test(product.ProductName)) {
            return false;
        }

        //Check if category is not invalid
        if (!/^[a-zA-Z]+$/.test(product.Category)) {
            return false;
        }

        //Check if manufacturer is not invalid
        if (!/^[a-zA-Z]+$/.test(product.Manufacturer)) {
            return false;
        }

        //Check if description is not too lengthy
        if (product.Description.length > 100) {
            return false;
        }

        //Check if price is less than 0
        if (product.Price < 0) {
            return false;
        }
        return true;
    }
}