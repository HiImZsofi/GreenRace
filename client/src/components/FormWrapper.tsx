import { Box, Card, Grid } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
	vhnum:string
	background:string
}
function FormWrapper(props: PropsWithChildren<Props>) {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: props.vhnum}}
			className={props.background}
		>
			<Grid item xs={3} style={{maxWidth: "100%"}}>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					textAlign={"center"}
					noValidate
					autoComplete="off"
				>
					<Card
						variant="outlined"
						sx={{
							padding: 2,
							backgroundColor: "rgba(255, 255, 255, 0.85);",
							boxShadow: 5,
						}}
					>
						{props.children}
					</Card>
				</Box>
			</Grid>
		</Grid>
	);
}

export default FormWrapper;
