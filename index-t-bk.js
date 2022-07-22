const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected successfully mongodb database......."))
  .catch((err) =>
    console.log("connected Fail to mongodb database.......", err)
  );

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublish: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourses() {
  const course = new Course({
    name: "angular course",
    author: "mosh",
    tags: ["angular", "front end"],
    isPublish: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find()
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
// createCourses();
