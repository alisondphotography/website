package main

import (
  "html/template"
  "net/http"
  "net/url"
  "log"
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
  "strings"
)

func main() {
  http.HandleFunc("/", indexHandler)
  http.HandleFunc("/about", aboutHandler)
  http.HandleFunc("/contact", contactHandler)
  http.HandleFunc("/weddings", weddingHandler)
  http.HandleFunc("/engagements", engagementHandler)
  http.HandleFunc("/rocket", submissionsHandler)
  http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
  http.ListenAndServe(":8080", nil)
}

var indexTemplate = template.Must(template.ParseFiles("template/root.html", "template/index.html", "template/nav.html", "template/contact.html"))
func indexHandler(w http.ResponseWriter, r *http.Request) {
  renderTemplate(w, indexTemplate, nil)
}

var aboutTemplate = template.Must(template.ParseFiles("template/root.html", "template/about.html", "template/nav.html", "template/contact.html"))
func aboutHandler(w http.ResponseWriter, r *http.Request) {
  renderTemplate(w, aboutTemplate, nil)
}

var contactTemplate = template.Must(template.ParseFiles("template/root.html", "template/about.html", "template/nav.html", "template/contact.html"))
func contactHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method == "POST" {
    name := r.FormValue("name")
    email := r.FormValue("email")
    phone := r.FormValue("phone")
    when := r.FormValue("when")
    where := r.FormValue("where")
    message := r.FormValue("message")

    db, err := sql.Open("sqlite3", "adp.db")
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
    }
    defer db.Close()

    stmt, err := db.Prepare("INSERT INTO submissions(name, email, phone, _when, _where, message) VALUES (?,?,?,?,?,?)")
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
    }
    defer stmt.Close()

    _, err = stmt.Exec(name, email, phone, when, where, message)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
    }

    formData := url.Values{
      "full_name": {name},
      "email": {email},
      "phone_number": {phone},
      "custom_3": {where},
      "event_date": {when},
      "event_details": {message},
      "vendor_id": {"5a5c46a4e922890e28f823b4"},
      "vendor_name": {"Alison Denise"},
      "contact_form_id": {"5ac4898b308d6d407ae6d8fb"},
      "company_id": {"5a5c46a5e922890e28f825bd"},
      "src_host": {"widget.honeybook.com"},
    }

    _, err = http.PostForm("https://www.honeybook.com/api/v2/workspace/widget_inquiries", formData)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
    }
  }
  renderTemplate(w, aboutTemplate, nil)
}

var portfolioTemplate = template.Must(template.ParseFiles("template/root.html", "template/portfolio.html", "template/nav.html", "template/contact.html"))
type PortfolioPage struct {
  Images []string
  Folder string
}
func weddingHandler(w http.ResponseWriter, r *http.Request) {
  page := PortfolioPage{
    weddings(),
    "/static/img/wedding/",
  }
  renderTemplate(w, portfolioTemplate, page)
}

func engagementHandler(w http.ResponseWriter, r *http.Request) {
  page := PortfolioPage{
    engagements(),
    "/static/img/engagement/",
  }
  renderTemplate(w, portfolioTemplate, page)
}

type Submission struct {
  Name,
  Email,
  Phone,
  Location,
  Date,
  Message string
}

var submissionsTemplate = template.Must(template.ParseFiles("template/root.html", "template/submissions.html"))
func submissionsHandler(w http.ResponseWriter, r *http.Request) {

  if r.URL.Query().Get("and") != "charlie" {
    http.NotFound(w, r)
    return
  }

  db, err := sql.Open("sqlite3", "adp.db")
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  defer db.Close()

  rows, err := db.Query("SELECT name, email, phone, _where, _when, message FROM submissions ORDER BY id DESC")
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  defer rows.Close()

  var submissions []Submission

  for rows.Next() {
    var s Submission
    err = rows.Scan(&s.Name, &s.Email, &s.Phone, &s.Location, &s.Date, &s.Message)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    submissions = append(submissions, s)
  }

  err = submissionsTemplate.Execute(w, submissions)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
}

func renderTemplate(w http.ResponseWriter, t *template.Template, data interface{}) {
  err := t.Execute(w, data)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

func init() {
  db, err := sql.Open("sqlite3", "adp.db")
  if err != nil {
    log.Fatal(err)
  }
  defer db.Close()

  _, err = db.Exec(
    "CREATE TABLE submissions(id INTEGER NOT NULL PRIMARY KEY," +
      "name TEXT NOT NULL," +
      "email TEXT NOT NULL," +
      "phone TEXT NOT NULL," +
      "_when TEXT NOT NULL," +
      "_where TEXT NOT NULL," +
      "message TEXT NOT NULL);",
  )
  if err != nil {
    if !strings.Contains(err.Error(), "exists") {
      log.Fatal(err)
    }
  }

}
