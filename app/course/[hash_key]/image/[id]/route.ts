import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const arr = req.url.split("/");
    const hash_key = arr[arr.length - 3];
    const id = arr[arr.length - 1];
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API}/course/${hash_key}/context/${id}`)
}