import { feedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = feedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
}
