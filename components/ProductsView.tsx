import { Category, Product } from "@/sanity.types";
import ProductGrid from "@/components/ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* Categories */}
      <div className="w-full sm:w-[200px]">
        {/*<CategorySelectorComponent categories={categories} /> */}
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
