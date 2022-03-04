/** @format */

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
	const router = useRouter();
	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		router.push("/");
	}

	return (
		<>
			<head>
				<title>add ur gundam</title>
			</head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);

	// function addMeetupHandler --> eventually execute in onAddMeetup in <NewMeetupForm /> hahaha
}

export default NewMeetupPage;

// package.json
// "dev": "next dev",
