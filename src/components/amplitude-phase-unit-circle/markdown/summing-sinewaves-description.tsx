import { useState } from "react";
import Markdown from "react-markdown";
// import description from "./summing-sinewaves-description.md?raw";
import description from "./summing-sinewaves-description.md?raw";

export const SummingSinewavesDescription = () => {
	const [markdownContent] = useState(description);

	return <Markdown children={markdownContent} />;
};
