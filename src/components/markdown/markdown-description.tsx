import { useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import description from "/src/markdown/description.md?raw";

// SyntaxHighlighter.registerLanguage("typescript", typescript);

export const MarkdownDescription = () => {
	const [markdownContent] = useState(description);

	return (
		<div className='post'>
			<Markdown
				children={markdownContent}
				remarkPlugins={[remarkMath]}
				rehypePlugins={[rehypeKatex]}
				components={{
					code(props) {
						const { children, className, ...rest } = props;
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							<SyntaxHighlighter
								PreTag='div'
								children={String(children).replace(/\n$/, "")}
								language={match[1]}
								style={darcula}
							/>
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						);
					},
				}}
			/>
		</div>
	);
};
