      let hour = document.querySelector("#hr");
      let minute = document.querySelector("#min");
      let second = document.querySelector("#sec");
      let ampm = document.querySelector("#ampm");

        let time = setInterval(() => {

        let date = new Date();
        //   console.log(date);

       let hr = date.getHours();
       let min = String(date.getMinutes()).padStart(2, "0");
       let sec = String(date.getSeconds()).padStart(2, "0");

       let period = hr>=12 ? 'PM' : 'AM'

        hr = String(hr).padStart(2, "0")

        hour.innerHTML = `${hr} :`;
        minute.innerHTML = `${min} :`;
        second.innerHTML = sec;
        ampm.innerHTML = period;

      }, 1000);
    
      