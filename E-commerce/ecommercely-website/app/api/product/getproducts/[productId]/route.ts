import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: { productId: string } }
) {
  try {
    console.log(req.url);
    const product = await prismadb.product.findUnique({
      where: { id: context.params.productId },
    });

    if (product) {
      return NextResponse.json(product);
    } else {
      return new NextResponse("Product not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
