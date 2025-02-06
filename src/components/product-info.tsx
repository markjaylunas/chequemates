import { ProductData } from "@/lib/types";
import AddToCartForm from "./add-to-cart-form";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ProductInfo({ product }: { product: ProductData }) {
  const {
    name,
    brand,
    description,
    price,
    oldPrice,
    currency,
    discount,
    stock,
  } = product;

  return (
    <Card className="max-w-md w-full shadow-none text-foreground border-none">
      <CardHeader className="space-y-2">
        <h4 className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">
          {brand}
        </h4>
        <CardTitle className="text-4xl font-bold">
          <h1>{name}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2 flex flex-row sm:flex-col justify-between ">
          <div className="flex items-center space-x-2">
            <span
              className="text-black text-2xl font-bold"
              aria-label={`Current Price: ${currency} ${price.toFixed(2)}`}
            >
              {currency} {price.toFixed(2)}
            </span>
            {discount > 0 && (
              <Badge className="bg-black text-white p-1 px-2">
                {discount}%
              </Badge>
            )}
          </div>
          {oldPrice ? (
            <span className="text-sm font-semibold line-through text-muted-foreground">
              {currency} {oldPrice.toFixed(2)}
            </span>
          ) : null}
        </div>
        {stock === 0 ? (
          <span className="text-red-500">Out of Stock</span>
        ) : (
          <AddToCartForm product={product} />
        )}
      </CardContent>
    </Card>
  );
}
