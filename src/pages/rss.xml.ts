import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

import { blogDescription, site } from "../constants";

export async function GET(context: APIContext) {
	const blogs = await getCollection("blog");

	return rss({
		customData: "<language>en-us</language>",
		description: blogDescription,
		items: blogs.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			link: `/blog/${post.slug}/`,
		})),
		site: context.site?.toString() ?? site,
		title: "Goldblog",
	});
}
