import { rssSchema } from "@astrojs/rss";
import { defineCollection, z } from "astro:content";

const speakingCollection = defineCollection({
	schema: z.object({
		category: z.string(),
		date: z.date(),
		event: z.string(),
		href: z.string(),
		links: z.record(z.string()).optional(),
		location: z.string().optional(),
		title: z.string().optional(),
	}),
});

const blogCollection = defineCollection({
	schema: ({ image }) => rssSchema.extend({
		description: z.string(),
		download: z.string().optional(),
		image: z
			.object({
				alt: z.string(),
				src: image().or(z.string()),
			})
			// TODO: add images for older blog posts, then remove this .optional()
			.optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	speaking: speakingCollection,
};
