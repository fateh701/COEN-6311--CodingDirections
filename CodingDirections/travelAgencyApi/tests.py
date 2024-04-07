from django.test import TestCase

# Create your tests here.
#to be added in Newfile Form.html
<!DOCTYPE html>
<html>
<head>
    <title>Booking Form</title>
</head>
<body>
    <h1>Booking Form</h1>
    <form method="POST">
        {% csrf_token %}
        <label for="location">location:</label>
        <input type="text" id="location" name="location">
        <br><br>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date">
        <br><br>
        <label for="price range">price range:</label>
        <select id="price range" name="price range">
            <option value="1000-2000">$0 - $500</option>
            <option value="2000-3000">$500 - $1000</option>
            <option value="3000-4000">$1000 - $1500</option>
            <option value="4000+">$1500+</option>
        </select>
        <br><br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <title>Booking Form</title>
</head>
<body>
    <h1>Booking Form</h1>
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Submit</button>
    </form>
</body>
</html>
