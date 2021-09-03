import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head'

// our-domain.com/
function HomePage(props) {

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!"/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// This method only runs from the current build
// If you add new data then you must rebuild if no revalidate is set
// during build process, allows for better SEO
export async function getStaticProps() {
    // fetch data from api/db
    const client = await MongoClient.connect('mongodb+srv://dbadmin:admin123@cluster0.2zys8.mongodb.net/meetups?retryWrites=true&w=majority')
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = meetupsCollection.find().toArray()

    return {
        props: {
            meetups: (await meetups).map(meetup => ({
                title: meetup.title, 
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

// This function does not run during build, runs on server after deployment
// Only if you need to use req and res
/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    // fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
} */

export default HomePage;