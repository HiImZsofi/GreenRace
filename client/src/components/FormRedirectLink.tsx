function FormRedirectLink(props: {
	url: string;
	classname: string;
	text: string;
}) {
	return (
		<div>
			<a href={props.url} className={props.classname}>
				{props.text}
			</a>
		</div>
	);
}

export default FormRedirectLink;
