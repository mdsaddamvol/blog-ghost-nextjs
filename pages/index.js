import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";

import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories }) => {
	console.log(articles);
	return (
		<Layout categories={categories}>
			<div className='uk-section'>
				<div className='uk-container uk-container-large'>
					<Articles articles={articles} />
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticProps() {
	// Run API calls in parallel
	const [articles, categories] = await Promise.all([
		fetchAPI("/articles"),
		fetchAPI("/categories"),
	]);

	return {
		props: { articles, categories },
		revalidate: 1,
	};
}

export default Home;
