const mongoose = require("mongoose");

mongoose
  // .connect("mongodb://localhost:27017/mongo-exercises")
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => {
    console.log("connected to database ......");
  })
  .catch((err) => {
    console.log("connection failse.....");
  });

const courseSchema = new mongoose.Schema({
  tags: String,
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Courses = mongoose.model("Course", courseSchema);

async function getCourses() {
  //   const courses = await Courses.find({ isPublished: true })
  //     .sort({ name: 1 })
  //     .select({ name: 1, author: 1, isPublished: 1 });
  //   console.log(courses);

  //   const courses = await Courses.find({
  //     isPublished: true,
  //     tags: { $in: ["frontend", "backend"] },
  //   })
  //     .sort({ price: -1 })
  //     .select({ name: 1, author: 1, price: 1, isPublished: 1 });
  //   console.log(courses);

  const courses = await Courses.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
  console.log(courses);
}
// getCourses();
async function updateCourse(id) {
  const course = await Courses.findByIdAndUpdate(
    id,
    {
      $set: {
        isPublished: false,
        author: "moc2",
      },
    },
    { new: true }
  );

  console.log(course);
}

updateCourse("5a68ff090c553064a218a547");
