
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const firstNameArr = ["Tanner", "Jason", "David", "Halley", "Kim", "John", "Nash"];
const lastNameArr = ["Linsley", "Maurer", "Todd", "Nguyen", "Smiths", "Lee", "Goldfields"];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getAge(d1){
    const d2 = new Date();
    const diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const newPerson = () => {
    const birthday = randomDate(new Date(1985, 0, 1), new Date())
    
  return {
    firstName: firstNameArr[Math.floor(Math.random() * firstNameArr.length)],
    lastName: lastNameArr[Math.floor(Math.random() * lastNameArr.length)],
    age: getAge(birthday),
    dob: birthday,
    friend: {
        name: firstNameArr[Math.floor(Math.random() * firstNameArr.length)] + " " + lastNameArr[Math.floor(Math.random() * lastNameArr.length)],
        age: Math.floor(Math.random() * 30),
    }
  };
};

function makeData(len = 1002) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}


export const data = makeData();