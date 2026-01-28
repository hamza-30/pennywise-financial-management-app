export function formatDateForInput(dateString) {
  const d = new Date(dateString);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateForUI(dateString){
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year:"numeric",
  });
}

export function checkDate(transDateStr, filter){
  let transDate = new Date(transDateStr)
  let today = new Date()

  switch(filter){
    case "Today":
      return transDate.toDateString() == today.toDateString()
    
    case "This month":
      return transDate.getFullYear() == today.getFullYear() && transDate.getMonth() == today.getMonth()
    
    case "Last month":
      let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      return transDate.getMonth() == lastMonth.getMonth() && transDate.getFullYear() == lastMonth.getFullYear()
    
    case "This week":
      let startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())

      return transDate >= startOfWeek && transDate <= today
    
    default:
      return true
  }
}















// const checkDate = (transDateStr, filter) => {
//     const transDate = new Date(transDateStr);
//     const now = new Date(); // Jan 28, 2026
    
//     // Strip time for clean comparison
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     switch (filter) {
//       case "Today":
//         return transDate.toDateString() === today.toDateString();

//       case "This month":
//         return (
//           transDate.getMonth() === today.getMonth() &&
//           transDate.getFullYear() === today.getFullYear()
//         );

//       case "Last month":
//         const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//         return (
//           transDate.getMonth() === lastMonth.getMonth() &&
//           transDate.getFullYear() === lastMonth.getFullYear()
//         );

//       case "This week":
//         // Calculate start of the week (Sunday)
//         const startOfWeek = new Date(today);
//         startOfWeek.setDate(today.getDate() - today.getDay());
//         return transDate >= startOfWeek && transDate <= now;

//       default:
//         return true;
//     }
//   }