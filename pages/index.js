/** @format */

import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "1st meetup",
		image: "https://wallpaperaccess.com/full/2760915.jpg",
		address: "GN-001",
		description: "Gundam Exia",
	},
	{
		id: "m2",
		title: "2nd meetup",
		image:
			"https://cdnb.artstation.com/p/assets/images/images/014/900/623/large/natalia-guevara-dynamesscreen.jpg?1546179485",
		address: "GN-002",
		description: "Gundam Dynames",
	},
];

function Homepage(propss) {
	return (
		<>
			<head>
				<title>Gundams</title>
				<meta name='description' content='Browsers' />
			</head>
			<MeetupList meetups02={propss.meetups01} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	// fetch data from an API
// 	return {
// 		// 這個 props -> 真 gloabl props, fixed, can't chg to propss/props01
// 		props: {
// 			meetups01: DUMMY_MEETUPS,
// 		},
// 	};
// }

// function getStaticProps --> run before rendering client page
// only run in server side
//
export async function getStaticProps() {
	// fetch data from an API
	const client = await MongoClient.connect(
		"mongodb+srv://kyle001:kyle001@cluster0.z1dic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetupsyy");
	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			// meetups01: DUMMY_MEETUPS,
			meetups01: meetups.map((meetup) => ({
				title: meetup.data.title,
				image: meetup.data.image,
				address: meetup.data.address,
				id: meetup._id.toString(),
			})),
		},
		// regenerate the page's second
		revalidate: 5,
	};
}
export default Homepage;
