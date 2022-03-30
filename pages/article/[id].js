import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";

const Article = ({ article, categories }) => {
	const seo = {
		metaTitle: article.title,
		metaDescription: article.description,
		shareImage: article.image,
		article: true,
	};

	return (
		<Layout categories={categories}>
			<Seo seo={seo} />
			<div
				id='banner'
				className='uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin'
				data-src={article.image}
				data-srcset={article.image}
				data-uk-img
			>
				<h1>{article.title}</h1>
			</div>
			<div className='uk-section'>
				<div className='uk-container uk-container-small'>
					<ReactMarkdown source={article.content} escapeHtml={false} />
					<hr className='uk-divider-small' />
					<div className='uk-grid-small uk-flex-left' data-uk-grid='true'>
						<div className='uk-width-expand'>
							<p className='uk-text-meta uk-margin-remove-top'>
								<Moment format='MMM Do YYYY'>{article.published_at}</Moment>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const articles = await fetchAPI("/articles");

	return {
		paths: articles.map((article) => ({
			params: {
				id: article.id.toString(),
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const articles = await fetchAPI(`/articles?id=${params.id}`);
	const categories = await fetchAPI("/categories");

	return {
		props: { article: articles[0], categories },
		revalidate: 1,
	};
}

export default Article;
