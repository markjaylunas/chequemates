import { ProductData } from "@/lib/types";
import AddToCartForm from "./add-to-cart-form";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ProductInfo({ product }: { product: ProductData }) {
  const { name, brand, description, price, oldPrice, currency, discount } =
    product;

  return (
    <Card className="max-w-md w-full shadow-none text-foreground border-none">
      <CardHeader className="space-y-2">
        <h4 className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">
          {brand}
        </h4>
        <CardTitle className="text-4xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-black text-2xl font-bold">
              {currency}
              {price.toFixed(2)}
            </span>
            <Badge className="bg-black text-white p-1 px-2">{discount}%</Badge>
          </div>
          <span className="text-sm font-semibold line-through text-muted-foreground">
            {currency}
            {oldPrice.toFixed(2)}
          </span>
        </div>
        <AddToCartForm productId={product.id} stock={product.stock} />
      </CardContent>
    </Card>
  );
}
