import aboutImg from "../assets/library-default.jpg"

function AboutPage() {
    return (
      <div>
        <h3>What is readCycle all about?</h3>
        <p>Sharing Stories, One Book at a Time: Dive into the Book Exchange Experience.</p>
        <p>We're all about spreading book love and good reads. <br></br>Join our book exchange community to swap your favorite stories, discover new adventures, and connect with fellow book enthusiasts who can't wait to share their literary treasures with you!</p>
        
        <h3>How it works?</h3>
        <p>Getting started is a breeze! Simply add the books you're willing to exchange to our platform. <br></br> When you spot a book you'd love to read, just let the owner know, and you can kick off a friendly chat to arrange the exchange details. <br></br> It's all about connecting with fellow bookworms and sharing the joy of reading!</p>

        <div> <img src={aboutImg} alt="About" /></div>
       
      </div>
    );
  }
  
  export default AboutPage;