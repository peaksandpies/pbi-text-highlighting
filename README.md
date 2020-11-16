# Text Highlighting by Peaks & Pies
This is a custom visual for Microsoft Power BI to highlight certain words in a text. For instance, you can use this custom visual for sentiment analysis and sentiment highlighting.


## About the Visual

### Data Input
The visualization is based on text data and their associated sentiment values. In other words, the visualization uses the index value of the text array for mapping and colors the text according to the index in the sentiment array. Your sentiment values can be integer and float values as well.

#### Data Fields
- Text Data (string values)
- Sentiment Data (numeric values)

```js
var textData = ["hello", "sweet", "but", "sometimes", "cruel", "world"]
var sentData = [0, 1, 0, 0, -1, 0]
```

#### Coloring

The coloring is based on simple rules:

```
 neutral: sentiment = 0
positive: sentiment > 0
negative: sentiment < 0
```

### Options

You have some options that can be used to modify the visualization, that is:

- Color
  - Neutral Sentiment
  - Positive Sentiment
  - Negative Sentiment
- Text
  - Size
  - Line Height
  - Font Family


## Best Practices

Use an index array for sorting (you can call it as you want). Add your data to your data model and sort the text data by the index values. This makes sure that your text is displayed in the way you want it.

```js
var indxData = [0, 1, 2, 3, 4, 5]
var textData = ["hello", "sweet", "but", "sometimes", "cruel", "world"]
var sentData = [0, 1, 0, 0, -1, 0]
```
