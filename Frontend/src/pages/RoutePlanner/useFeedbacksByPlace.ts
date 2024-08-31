import { LatLngExpression } from "leaflet";
import { MockDataType } from "../../mock/mock";

export type FeedbackItem = {
  name: string;
  date: string;
  feedback: string;
};

export type CityFeedback = {
  coordinates: string;
  feedbacks: FeedbackItem[];
};

export type FeedbackMap = {
  [city: string]: CityFeedback;
};


function useFeedbacksByPlace() {

  function processFeedback(mock_data: MockDataType[]): FeedbackMap {
    const feedbackMap: FeedbackMap = {};

    mock_data.forEach(client => {
      client.history.forEach(({ feedback, date, city, cord }) => {
        if (!feedbackMap[city]) {
          feedbackMap[city] = {
            coordinates: cord,
            feedbacks: [{ name: client.name, date, feedback }]
          };
        } else {
          feedbackMap[city].feedbacks.push({ name: client.name, date, feedback });
        }
      });
    });

    return feedbackMap;
  }
  const parseCoordinates = (coordString: string): LatLngExpression => {
      const [lat, lng] = coordString.split(',').map(parseFloat);
      return [lat, lng];
  };


    const getNameInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return firstName.charAt(0) + lastName.charAt(0);
    }

  
  

return {
  processFeedback,
  parseCoordinates,
  getNameInitials
}


}

export default useFeedbacksByPlace;