





(function (){ var issues = document.querySelectorAll('.opened-by')
var totalIssues = [...issues].map(j => j.innerText.trim().replace(/\n/ig, '').split(' ')[0])
// console.log(totalIssues)
function fetchURLs() {
  {
    totalIssues.forEach(i => {
      var issueNumber = i.split('#').join('')
      var presentHref = window.location.href  
      var modifiedHref = window.location.href.includes("?q=is%3Aissue+is%3Aclosed") ? presentHref.split("?")[0] : presentHref
      fetch(modifiedHref + `/${issueNumber}`).then((response) => {
        return response.text()
      }).then(html => {
        var parser = new DOMParser();
        var doc2 = parser.parseFromString(html, 'text/html');
        var item = doc2.querySelectorAll('.js-issue-sidebar-form');
        let children = item[1].innerText
        let regexElem = children.replace(/ /g, '').trim().replace(/\r?\n|\r/g, " ").split('    ')
        console.log(regexElem,"regex")
        let filtered = regexElem.filter(item => item.length > 0)
        let projects=[]
        // console.log(filtered,"filter brefore first shift")

        filtered.shift()
        // console.log(filtered,"filter after first shift")

        if(filtered[0]=="Projects"|| (filtered[0]==" Projects")){
          filtered.shift()
        }
        

        //logic for showing multiple projects 

        if(document.querySelector('.user-profile-link').innerText.split(' ').pop().toLowerCase() == modifiedHref.split('/')[3].toLowerCase()){
          projects.push(filtered[0])
          filtered.map(project=>{
            
            if(project.includes("  ")){
              // console.log(" space detected")
              projects.push(project)
            }
          })
          // console.log(" repo of logged in user")
        }else{
          filtered.map(project=>{
            // console.log(project)
            projects.push((project.trim().split("   ")[0]))
            
          })
          // console.log("repo of unlogged user")
        }
        // console.log(filtered,"filter after if condition")
        // console.log("projects",projects)
        var issue = document.getElementById(`issue_${issueNumber}_link`)
        // console.log(issueNumber)
        var div = document.createElement('div')
        issue.append(div)
        projects.forEach(project=>{
          var p = document.createElement('p')
          p.innerText = project
          p.style.background="#6FCA55"
          p.style.color = "#ffffff"
          p.style.border="1px solid grey"
          p.style.width = "50px"
          p.style.padding = "2px"
          // p.style.width = "fit-content"
          p.style.fontSize = "10px"
          p.style.borderRadius = "2px"
          p.style.textAlign =  "center";
          p.style.display = "inline-block"
          p.style.margin = "2px"
          // p.classList.add('btn btn-primary')
          p.innerText=='Noneyet' ? '' : div.append(p)

        })

        // below code was causing the projects to appear
        // console.log(document.querySelector('.user-profile-link').innerText.split(' '))
        // console.log(modifiedHref.split('/')[3])
        // const x = document.querySelector('.user-profile-link')
        // console.log(x,"x")
        // x.innerText.split(' ').pop().toLowerCase() == modifiedHref.split('/')[3] ? p.innerText = `${filtered.join(' ').split(' ')[2]}` : p.innerText = `${filtered.join(' ').split(' ')[1]}`
        

        
        
        
      })
    })
  }
}
fetchURLs()
})()
