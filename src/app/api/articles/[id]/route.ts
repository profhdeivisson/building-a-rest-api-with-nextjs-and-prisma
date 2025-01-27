import client from '@/lib/prisma/client';
import { Article } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextResponse, NextRequest } from 'next/server';

type FindById = {
    id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
    try {
        const article: Article = await client.article.findUniqueOrThrow({
            where: {
                id: Number(context.params.id),
            },
        });

        return new NextResponse(JSON.stringify(article), {
            status: 200,
            statusText: 'OK',
        });
    } catch (error) {
        const msgError = (error as PrismaClientKnownRequestError).message;

        return new NextResponse(JSON.stringify({ message: msgError }), {
            status: 404,
            statusText: 'Not Found',
        });
    }
}

export async function PUT(request: NextRequest, context: { params: FindById }) {
    const newArticleData: Article = await request.json();

    try {
        const updatedArticle: Article = await client.article.update({
            where: {
                id: Number(context.params.id),
            },
            data: newArticleData,
        });

        return new NextResponse(JSON.stringify(updatedArticle), {
            status: 200,
            statusText: 'OK',
        });
    } catch (error) {
        const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

        return new NextResponse(JSON.stringify({ message: msgError }), {
            status: 404,
            statusText: 'Not Found',
        });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: FindById }
) {
    try {
        await client.article.delete({
            where: {
                id: Number(context.params.id),
            },
        });

        return new NextResponse(null, {
            status: 204,
            statusText: 'No Content',
        });
    } catch (error) {
        const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

        return new NextResponse(JSON.stringify({ message: msgError }), {
            status: 404,
            statusText: 'Not Found',
        });
    }
}