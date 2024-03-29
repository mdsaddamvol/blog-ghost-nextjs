import Articles from "../../components/articles";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Category = ({ category, categories }) => {
	console.log(category);
	const seo = {
		metaTitle: category.name,
		metaDescription: `All ${category.name} articles`,
	};

	return (
		<Layout categories={categories}>
			<Seo seo={seo} />
			<div className='uk-section'>
				<div className='uk-container uk-container-large'>
					<h1>{category.name}</h1>
					<Articles articles={category.articles} />
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const categories = await fetchAPI("/categories");

	return {
		paths: categories.map((category) => ({
			params: {
				id: category.id.toString(),
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const category = await fetchAPI(`/categories/${params.id}`);
	const categories = await fetchAPI("/categories");

	return {
		props: { category, categories },
		revalidate: 1,
	};
}

export default Category;
