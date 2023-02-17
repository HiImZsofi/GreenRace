import { Box, Card, Grid } from "@mui/material";
import { PropsWithChildren } from "react";

function FormWrapper(props: PropsWithChildren) {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
			className="loginbackground"
		>
			<Grid item xs={3}>
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