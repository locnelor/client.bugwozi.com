import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const arr = req.url.split("/");
    const imgId = arr[arr.length - 1];
    const hash_key = arr[arr.length - 2];
    const prefix = arr[arr.length - 3];
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API}/media/context/image/${prefix}/${hash_key}/${imgId}`)
}

