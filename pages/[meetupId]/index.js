/** @format */

import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
	return (
		<>
			<header>
				<title>{props.meetupData.address}</title>
				<meta name='description' content={props.meetupData.description} />
			</header>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://kyle001:kyle001@cluster0.z1dic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetupsyy");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: "blocking",
		// fallback: true,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		"mongodb+srv://kyle001:kyle001@cluster0.z1dic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetupsyy");

	// const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});
	client.close();

	// console.log(meetupId);

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.data.title,
				address: selectedMeetup.data.address,
				image: selectedMeetup.data.image,
				description: selectedMeetup.data.description,
			},
		},
	};
}

export default MeetupDetails;
