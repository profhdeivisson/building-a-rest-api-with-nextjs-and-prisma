import client from '@/lib/prisma/client';
import { Article } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const newArticle: Article = await request.json();
    const createdArticle: Article = await client.article.create({
        data: newArticle,
    });

    return new NextResponse(JSON.stringify(createdArticle), {
        status: 201,
        statusText: 'Created',
    });
}

export async function GET() {
    const articles: Article[] = await client.article.findMany();

    return new NextResponse(JSON.stringify(articles), {
        status: 200,
        statusText: 'OK',
    });
}