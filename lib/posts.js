import fs from 'fs';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkRehype from 'remark-rehype/lib';
import remarkToc from 'remark-toc';

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostsName() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fileDirectory = path.join(postsDirectory, `${id}.md`)

    const fileContents = fs.readFileSync(fileDirectory, {
        encoding: "utf-8"
    });

    const processedContent = await remark()
        // .use(remarkGfm)
        .use(remarkToc, {
            tight: true,
        })
        .use(remarkRehype)
        .use(rehypeStringify)
        // .use(remarkHtml)
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .process(fileContents)
    console.log("pro", processedContent)
    const contentHTML = processedContent.toString()
    console.log(contentHTML)
    return {
        id,
        contentHTML
    }
}


